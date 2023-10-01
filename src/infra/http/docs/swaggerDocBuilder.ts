import { env } from "@/utils/env";
import { OpenAPIObject } from "openapi3-ts/dist/oas30";
import { AboutPageSwaggerSchema as AboutPage } from './AboutPage/AboutPageSchema';
import { aboutPath } from "./AboutPage/paths/about";
import { signinPath } from "./Auth/paths/signin";
import { signoutPath } from "./Auth/paths/signout";
import { verifyTokenPath } from "./Auth/paths/verifyToken";
import { ContactPageSwaggerSchema as ContactPage } from './ContactPage/ContactPageSchema';
import { contactPath } from "./ContactPage/paths/contact";
import { imagePath } from "./Image/paths/image";
import { ProjectSwaggerSchema as Projects } from './Projects/ProjectSchema';
import { projectPath } from "./Projects/paths/project";
import { projectByIdPath } from "./Projects/paths/projectById";
import { projectsPath } from "./Projects/paths/projects";
import { projectsByTitlePath } from "./Projects/paths/projectsByTitle";
import { SkillSwaggerSchema as Skill } from './Skills/SkillSchema';
import { skillsPath } from "./Skills/paths/skills";
import { userPath } from "./Users/paths/user";
import { userByEmailPath } from "./Users/paths/userByEmail";
import { userByIdPath } from "./Users/paths/userById";
import { userPasswordRecoveryPath } from "./Users/paths/userPasswordRecovery";
import { usersPath } from "./Users/paths/users";
import { usersByNamePath } from "./Users/paths/usersByName";
import { info } from "./info";

export const swaggerDoc: OpenAPIObject = {
  openapi: "3.0.0",
  info,
  servers: [
    {
      url: `${env.HOST}:${env.PORT}`,
      description: 'Documentação da API LOCAL do site iKatoo.com.br'
    },
    {
      url: "https://backend-development-1651.up.railway.app",
      description: 'Documentação da API ONLINE do site iKatoo.com.br'
    }
  ],
  components: {
    schemas: {
      Skill, AboutPage, ContactPage, Projects
    },
    securitySchemes: {
      "bearerAuth": {
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer",
        name: 'Authorization'
      }
    }
  },
  paths: {
    "/about": aboutPath,
    "/contact": contactPath,
    "/projects": projectsPath,
    "/project/id/{id}": projectByIdPath,
    "/projects/title/{title}": projectsByTitlePath,
    "/project": projectPath,
    "/skills": skillsPath,
    "/image": imagePath,
    "/user": userPath,
    "/users": usersPath,
    "/user/email/{email}": userByEmailPath,
    "/users/name/{partialName}": usersByNamePath,
    "/user/password-recovery": userPasswordRecoveryPath,
    "/user/id/{id}": userByIdPath,
    "/auth/verify-token": verifyTokenPath,
    "/auth/sign-in": signinPath,
    "/auth/sign-out": signoutPath
  }
}
