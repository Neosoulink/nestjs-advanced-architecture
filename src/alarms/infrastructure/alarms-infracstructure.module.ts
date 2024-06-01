import { Module } from '@nestjs/common';
import { OrmAlarmPersistanceModule } from './persistence/orm/orm-persistence.module';
import { InMemoryAlarmPersistanceModule } from './persistence/in-memory/in-memory-persistence.module';

@Module({})
export class AlarmsInfrastructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm'
        ? OrmAlarmPersistanceModule
        : InMemoryAlarmPersistanceModule;

    return {
      module: AlarmsInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
