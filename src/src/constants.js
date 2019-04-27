let env = 'prod';
if (process.env.NODE_ENV === 'development') {
  env = 'dev';
}

const API = env === 'prod' ? 'https://cogs.red/api/v1/' : 'http://localhost:3000/';
const COGS = `${API}cogs`;
const REPOS = `${API}repos`;
const TAGS = `${API}tags/top`;
const SEARCH = `${API}search/cogs`;

export default {
  API,
  COGS,
  REPOS,
  TAGS,
  SEARCH,
};
