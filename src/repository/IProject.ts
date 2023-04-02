import { z } from "zod";

export const ProjectSchema = z.object({
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

export type PartialProject = z.infer<typeof PartialProjectSchema>

export type ProjectWithId = Project & { id: number }

export default interface IProjects {
  createProject(project: Project): Promise<void>;
  getProjects(): Promise<ProjectWithId[]>;
  getProjectById(id: number): Promise<ProjectWithId | undefined>;
  getProjectByTitle(title: string): Promise<ProjectWithId | undefined>;
  updateProject(id: number, project: PartialProject): Promise<void>;
  deleteProject(id: number): Promise<void>;
  clear(): Promise<void>
}