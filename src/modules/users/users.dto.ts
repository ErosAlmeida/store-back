import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'
import { Role } from '../../generated/prisma/enums'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: 'John Doe',
    description: 'The email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'Strong@123',
    description:
      'User password (minimum 8 characters, including an uppercase letter, a number, and a symbol)',
  })
  @IsString()
  @MinLength(8, {
    message: 'Password must be at least 8 characters',
  })
  @MaxLength(32, {
    message: 'Password must be at most 32 characters',
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message:
      'Password must contain uppercase letter, number and special character',
  })
  password: string

  @ApiProperty({
    example: Role.USER,
    description: 'The role of the user',
    enum: Role,
    default: Role.USER,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role = Role.USER
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({
    example: 'USER',
    description: 'The role of the user',
    enum: Role,
    required: false,
  })
  @IsEnum(Role)
  @IsOptional()
  role?: Role
}

export class UserResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the user',
  })
  id: string

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar URL of the user',
    required: false,
  })
  avatar?: string

  @ApiProperty({
    example: 'email@example.com',
    description: 'The email of the user',
  })
  email: string

  @ApiProperty({
    example: Role.USER,
    description: 'The role of the user',
    enum: Role,
  })
  role: Role

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date when the user was created',
  })
  createdAt: Date

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'The date when the user was last updated',
  })
  updateAt: Date
}

class UserProjectResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the project',
  })
  id: string

  @ApiProperty({
    example: 'Project 1',
    description: 'The name of the project',
  })
  name: string

  @ApiProperty({
    example: 'Description of project 1',
    description: 'The description of the project',
  })
  description?: string
}

export class UserFullResponseDto extends UserResponseDto {
  @ApiProperty({
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Project 1',
        description: 'Description of project 1',
      },
    ],
    description: 'The projects created by the user',
  })
  createdProjects: UserProjectResponseDto[]
}