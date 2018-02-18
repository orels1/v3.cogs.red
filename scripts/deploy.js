const http = require('http');
const https = require('https');

if (!process.argv[2]) {
  console.error('No version number passed!');
  process.exit(1);
  return;
}

const notifyDiscord = (data) => {
  const req = https.request({
    method: 'POST',
    hostname: 'discordapp.com',
    path: process.env.DISCORD_PORTAINER_HOOK,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  req.write(JSON.stringify(data));
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
};

const getJWT = http.request({
  hostname: 'portainer.v3.cogs.red',
  method: 'POST',
  path: '/api/auth',
}, (jwtRes) => {
  jwtRes.setEncoding('utf8');
  let rawJWTData = '';
  jwtRes.on('data', (chunk) => { rawJWTData += chunk; });
  jwtRes.on('end', () => {
    const JWT = JSON.parse(rawJWTData).jwt;

    // searching for cogs service
    http.get({
      hostname: 'portainer.v3.cogs.red',
      path: '/api/endpoints/1/docker/services',
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    }, (serviceRes) => {
      serviceRes.setEncoding('utf8');
      let rawServiceData = '';
      serviceRes.on('data', (chunk) => { rawServiceData += chunk; });
      serviceRes.on('end', () => {
        const services = JSON.parse(rawServiceData);

        const cogsService = services.filter(i => i.Spec.Name === 'Cogs_app')[0];
        const cogsServiceId = cogsService.ID;

        // getting current cogs service setup
        http.get({
          hostname: 'portainer.v3.cogs.red',
          path: `/api/endpoints/1/docker/services/${cogsServiceId}`,
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
        }, (cogsRes) => {
          cogsRes.setEncoding('utf8');
          let rawCogsData = '';
          cogsRes.on('data', (chunk) => { rawCogsData += chunk; });
          cogsRes.on('end', () => {
            const cogs = JSON.parse(rawCogsData);

            const cogsData = {
              ...cogs.Spec,
              TaskTemplate: {
                ...cogs.Spec.TaskTemplate,
                ContainerSpec: {
                  ...cogs.Spec.TaskTemplate.ContainerSpec,
                  Image: `orels1/v3.cogs.red:alpha-${process.argv[2]}`,
                },
              },
            };

            // updating cogs service
            const updateReq = http.request({
              hostname: 'portainer.v3.cogs.red',
              method: 'POST',
              path: `/api/endpoints/1/docker/services/${cogsServiceId}/update?version=${cogs.Version.Index}`,
              headers: {
                Authorization: `Bearer ${JWT}`,
              },
            }, (updateRes) => {
              updateRes.setEncoding('utf8');
              let rawResData = '';
              updateRes.on('data', (chunk) => { rawResData += chunk; });
              updateRes.on('end', () => {
                const update = JSON.parse(rawResData);
                if (update.Warnings === null) {
                  console.log(`Succeffuly deployed version ${process.argv[2]}`);
                  notifyDiscord({
                    embeds: [
                      {
                        title: `Successfully deployed version ${process.argv[2]}`,
                        color: 44621,
                      },
                    ],
                  });
                  return;
                }
                console.error('Received warnings while updating', update.Warnings);
                process.exit(1);
              });
            });

            getJWT.on('error', (e) => {
              console.error('Could not update cogs service');
              console.error(e.message, e.stack);
              process.exit(1);
            });
            updateReq.write(JSON.stringify(cogsData));
            updateReq.end();
          });
        });
      });
    });
  });
});

getJWT.on('error', (e) => {
  console.error('Could not get JWT token');
  console.error(e.message, e.stack);
  process.exit(1);
});

getJWT.write(JSON.stringify({
  Username: process.env.PORTAINER_USER,
  Password: process.env.PORTAINER_PASS,
}));
getJWT.end();
