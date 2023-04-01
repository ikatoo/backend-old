import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.number(),
  snapshot: z.string(),
  description: z.object({
    title: z.string(),
    subTitle: z.string(),
    content: z.string(),
  }),
  githubLink: z.string()
})

export const PartialProjectSchema = ProjectSchema.deepPartial()

export type Project = z.infer<typeof ProjectSchema>

export type ProjectInput = Omit<Project, "id">
export type PartialProject = Omit<z.infer<typeof PartialProjectSchema>, 'id'>

export default interface IProjects {
  createProject(project: ProjectInput): Promise<void>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectByTitle(title: string): Promise<Project | undefined>;
  updateProject(id: number, project: PartialProject): Promise<void>;
  deleteProject(id: number): Promise<void>;
  clear(): Promise<void>
}