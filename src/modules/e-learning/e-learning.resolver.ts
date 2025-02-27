import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Float,
  Parent,
  Context,
} from '@nestjs/graphql';
import { ELearningService } from './e-learning.service';
import { UsersService } from '../users/users.service';
import { Course } from './entity/course.entity';
import { Module } from './entity/module.entity';
import { Lesson } from './entity/lesson.entity';
import { CreateCourseDTO } from './dto/create-course.input';
import { UpdateCourseDTO } from './dto/update-course.input';
import { CreateLessonDTO } from './dto/create-lesson.input';
import { UpdateLessonDTO } from './dto/update-lesson.input';
import { CreateModuleDTO } from './dto/create-module.input';
import { UpdateModuleDTO } from './dto/update-module.input';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private readonly eLearningService: ELearningService,
    private readonly userProgressService: UsersService,
  ) {}

  @Query(() => [Course], { name: 'getCourses' })
  async getCourses(
    @Args('category', { nullable: true }) category?: string,
    @Args('search', { nullable: true }) search?: string,
  ): Promise<Course[]> {
    return this.eLearningService.getCourses(category, null, search, null);
  }

  @Query(() => Course, { name: 'getCourseById' })
  async getCourseById(
    @Args('id') id: number,
    @Args('userId', { nullable: true }) userId?: number,
  ): Promise<Course> {
    return this.eLearningService.getCourseById(id, userId);
  }

  @Mutation(() => Course, { name: 'createCourse' })
  async createCourse(
    @Args('createCourseInput') createCourseInput: CreateCourseDTO,
  ): Promise<Course> {
    return this.eLearningService.createCourse(createCourseInput);
  }

  @Mutation(() => Course, { name: 'updateCourse' })
  async updateCourse(
    @Args('id') id: number,
    @Args('updateCourseInput') updateCourseInput: UpdateCourseDTO,
  ): Promise<Course> {
    return this.eLearningService.updateCourse(id, updateCourseInput);
  }

  @Mutation(() => Boolean, { name: 'deleteCourse' })
  async deleteCourse(@Args('id') id: number): Promise<boolean> {
    await this.eLearningService.deleteCourse(id);
    return true;
  }

  @ResolveField(() => Float, { nullable: true })
  async progress(
    @Parent() course: Course,
    @Context() context,
  ): Promise<number> {
    const userId = context.req.user.id;
    return this.userProgressService.getCourseProgress(userId, course.id);
  }
}

@Resolver(() => Module)
export class ModuleResolver {
  constructor(private readonly eLearningService: ELearningService) {}

  @Query(() => [Module], { name: 'getModulesByCourse' })
  async getModulesByCourse(
    @Args('courseId') courseId: number,
  ): Promise<Module[]> {
    return this.eLearningService.getModulesByCourse(courseId);
  }

  @Query(() => [Module], { name: 'getAllModules' })
  async getAllModules(): Promise<Module[]> {
    return this.eLearningService.getAllModules();
  }

  @Mutation(() => Module, { name: 'createModule' })
  async createModule(
    @Args('createModuleInput') createModuleInput: CreateModuleDTO,
  ): Promise<Module> {
    return this.eLearningService.createModule(createModuleInput);
  }

  @Mutation(() => Module, { name: 'updateModule' })
  async updateModule(
    @Args('id') id: number,
    @Args('updateModuleInput') updateModuleInput: UpdateModuleDTO,
  ): Promise<Module> {
    return this.eLearningService.updateModule(id, updateModuleInput);
  }

  @Mutation(() => Boolean, { name: 'deleteModule' })
  async deleteModule(@Args('id') id: number): Promise<boolean> {
    await this.eLearningService.deleteModule(id);
    return true;
  }
}

@Resolver(() => Lesson)
export class LessonResolver {
  constructor(private readonly eLearningService: ELearningService) {}

  @Query(() => Lesson, { name: 'getLessonContent' })
  async getLessonContent(
    @Args('lessonId') lessonId: number,
    @Args('userId') userId: number,
  ): Promise<Lesson> {
    return this.eLearningService.getLessonContent(lessonId, userId);
  }

  @Query(() => [Lesson], { name: 'getLessonsByModule' })
  async getLessonsByModule(
    @Args('moduleId') moduleId: number,
  ): Promise<Lesson[]> {
    return this.eLearningService.getLessonsByModule(moduleId);
  }

  @Mutation(() => Lesson, { name: 'createLesson' })
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonDTO,
  ): Promise<Lesson> {
    return this.eLearningService.createLesson(createLessonInput);
  }

  @Mutation(() => Lesson, { name: 'updateLesson' })
  async updateLesson(
    @Args('id') id: number,
    @Args('updateLessonInput') updateLessonInput: UpdateLessonDTO,
  ): Promise<Lesson> {
    return this.eLearningService.updateLesson(id, updateLessonInput);
  }

  @Mutation(() => Boolean, { name: 'deleteLesson' })
  async deleteLesson(@Args('id') id: number): Promise<boolean> {
    await this.eLearningService.deleteLesson(id);
    return true;
  }

  @Mutation(() => Boolean, { name: 'completeLesson' })
  async completeLesson(
    @Args('lessonId') lessonId: number,
    @Args('userId') userId: number,
  ): Promise<boolean> {
    await this.eLearningService.completeLesson(userId, lessonId);
    return true;
  }
}
