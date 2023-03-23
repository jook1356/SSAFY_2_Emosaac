const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  // 환경에 따라 적절한 .env 파일을 로드합니다.
  const env = isDev
    ? require("./.env.local")
    : isProd
    ? require("./.env.production")
    : {};

  // Next.js 설정을 반환합니다.
  return {
    env,
    images: {
      loader: "imgix",
      path: "https://j8d203.p.ssafy.io",
    },
    // 다른 Next.js 설정을 여기에 추가할 수 있습니다.
  };
};
