import { CreateUserDTO } from './CreateUser.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
