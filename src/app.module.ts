import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { TypeOrmModule } from "@nestjs/typeorm";
@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 1,
      username: "fake",
      password: "fake",
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
