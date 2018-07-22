import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'http://keycloak:8000/auth',
  realm: 'glossary',
  clientId: 'glossary-web-client'
};

export const environment = {
  production: true,
  keycloak: keycloakConfig
};
