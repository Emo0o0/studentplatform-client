import Keycloak from "keycloak-js";

let keycloakInstance = null;

const initKeycloak = () => {
  if (keycloakInstance) {
    return keycloakInstance;
  }

  const keycloakConfig = {
    url: "http://localhost:8180/",
    realm: "StudentPlatform",
    clientId: "MainClient",
  };

  keycloakInstance = new Keycloak(keycloakConfig);
  return keycloakInstance;
};

const keycloak = initKeycloak();

export default keycloak;
