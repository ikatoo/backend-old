import { env } from "@/utils/env";
import { OpenAPIObject } from "openapi3-ts/dist/oas30";
import { AboutPageSwaggerSchema as AboutPage } from './AboutPage/AboutPageSchema';
import { aboutPath } from "./AboutPage/paths/about";
import { ContactPageSwaggerSchema as ContactPage } from './ContactPage/ContactPageSchema';
import { ProjectSwaggerSchema as Projects } from './Projects/ProjectSchema';
import { SkillSwaggerSchema as Skill } from './Skills/SkillSchema';
import { info } from "./info";
import { contactPath } from "./ContactPage/paths/contact";
import { projectsPath } from "./Projects/paths/projects";
import { projectByIdPath } from "./Projects/paths/projectById";
import { projectsByTitlePath } from "./Projects/paths/projectsByTitle";
import { projectPath } from "./Projects/paths/project";
import { skillsPath } from "./Skills/paths/skills";
import { imagePath } from "./Image/paths/image";
import { userPath } from "./Users/paths/user";
import { usersPath } from "./Users/paths/users";
import { userByEmailPath } from "./Users/paths/userByEmail";
import { usersByNamePath } from "./Users/paths/usersByName";
import { userPasswordRecoveryPath } from "./Users/paths/userPasswordRecovery";
import { userByIdPath } from "./Users/paths/userById";

export const swaggerDoc: OpenAPIObject = {
  openapi: "3.0.0",
  info,
  servers: [
    {
      url: env.NODE_ENV.includes('dev') ? `${env.HOST}:${env.PORT}` : `${env.HOST}`,
      description: 'Documentação da API do site iKatoo.com.br'
    }
  ],
  components: {
    schemas: {
      Skill, AboutPage, ContactPage, Projects
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
    // "/auth/verify-token": verifyTokenPath,
    // "/auth/sign-in": signinPath,
    // "/auth/sign-out": signoutPath
  }
}
