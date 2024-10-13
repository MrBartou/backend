import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditResolver } from './audit.resolver';

@Module({
  providers: [AuditService, AuditResolver]
})
export class AuditModule {}
