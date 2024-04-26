import type { ConfigService } from '@nestjs/config';
import { ValidatorOptions, ValidationError } from 'class-validator';
import { Transform, plainToInstance } from 'class-transformer';
import {
	IsIn,
	IsInt,
	IsString,
	validateSync,

} from 'class-validator';

class EnvVars {
	
	@IsInt()
	@Transform(({ value }) => parseFloat(value))
	PORT: number;

	@IsIn(['dev', 'test', 'production'])
	NODE_ENV: 'dev' | 'test' | 'production';

	@IsString()
	JWT_SECRET: string;

	@IsString()
	DATABASE_URL: string;
}

export type AppConfig = ConfigService<EnvVars>;

export function validateConfig(config: Record<string, unknown>) {
	const validatedConfig = plainToInstance(EnvVars, config);
	const errors = validateSync(validatedConfig, {
		skipMissingProperties: false,
	});

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}
	return validatedConfig;
}

export interface ValidationPipeOptions extends ValidatorOptions {
	transform?: boolean;
	disableErrorMessages?: boolean;
	exceptionFactory?: (errors: ValidationError[]) => any;
  }