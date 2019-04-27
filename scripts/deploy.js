/* eslint-disable no-console */
const { get, request, httpsRequest } = require('./promisified');

if (!process.argv[2]) {
  console.error('No version number passed!');
  process.exit(1);
  return;
}

const notifyDiscord = async data => (
  httpsRequest({
    method: 'POST',
    hostname: 'discordapp.com',
    path: process.env.DISCORD_PORTAINER_HOOK,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  })
);

(async () => {
  // 1. get JWT token for portianer interaction
  const getJWT = await request({
    hostname: 'portainer.v3.cogs.red',
    method: 'POST',
    path: '/api/auth',
    data: JSON.stringify({
      Username: process.env.PORTAINER_USER,
      Password: process.env.PORTAINER_PASS,
    }),
  });
  let jwtData = '';
  getJWT.on('data', (chunk) => { jwtData += chunk; return jwtData; });
  await getJWT.end;
  const JWT = JSON.parse(jwtData).jwt;

  // 2. get the list of services
  const getServices = await get({
    hostname: 'portainer.v3.cogs.red',
    path: '/api/endpoints/1/docker/services',
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });
  let serviceListData = '';
  getServices.on('data', (chunk) => { serviceListData += chunk; return serviceListData; });
  await getServices.end;
  const serviceList = JSON.parse(serviceListData);

  // 3. find the cogs service
  const cogsServiceId = serviceList.filter(i => i.Spec.Name === 'Cogs_app')[0].ID;

  // 4. get current cogs service config
  const getCogsConfig = await get({
    hostname: 'portainer.v3.cogs.red',
    path: `/api/endpoints/1/docker/services/${cogsServiceId}`,
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
  });
  let cogsConfigData = '';
  getCogsConfig.on('data', (chunk) => { cogsConfigData += chunk; return cogsConfigData; });
  await getCogsConfig.end;
  const cogsConfig = JSON.parse(cogsConfigData);

  const cogsNewConfig = {
    ...cogsConfig.Spec,
    TaskTemplate: {
      ...cogsConfig.Spec.TaskTemplate,
      ContainerSpec: {
        ...cogsConfig.Spec.TaskTemplate.ContainerSpec,
        Image: `orels1/v3.cogs.red:alpha-${process.argv[2]}`,
      },
    },
  };

  // 5. update the cogs service with new image tag
  const updateService = await request({
    hostname: 'portainer.v3.cogs.red',
    method: 'POST',
    path: `/api/endpoints/1/docker/services/${cogsServiceId}/update?version=${cogsConfig.Version.Index}`,
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    data: JSON.stringify(cogsNewConfig),
  });
  let updatedServiceData = '';
  updateService.on('data', (chunk) => { updatedServiceData += chunk; return updatedServiceData; });
  await updateService.end;
  const updatedService = JSON.parse(updatedServiceData);

  // 6. check if update was succsessfull, notify discord if so
  if (updatedService.Warnings === null) {
    console.log(`Succeffuly deployed version ${process.argv[2]}`);
    await notifyDiscord({
      embeds: [
        {
          title: `Successfully deployed version ${process.argv[2]}`,
          color: 44621,
        },
      ],
    });
    return;
  }
  console.error('Received warnings while updating', updatedService.Warnings);
  process.exit(1);
})();
