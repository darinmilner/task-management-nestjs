import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    //query builder to get tasks
    const query = this.createQueryBuilder("task");

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      //looks for partial result in search in title or description
      query.andWhere(
        "LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)",
        { search: `%${search}%` },
      );
    }

    //convert search and query to lower case
    //get many tasks
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);

    return task;
  }
}
