import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { AcknowledgeAlarmCommand } from './acknowledge-alarm.command';
import { Alarm } from '../../../alarms/domain/alarm';
import { AggregateRehydrator } from '../../../shared/application/aggregate-rehydrator';

@CommandHandler(AcknowledgeAlarmCommand)
export class AcknowledgeAlarmCommandHandler implements ICommandHandler {
  private readonly logger = new Logger(AcknowledgeAlarmCommand.name);

  constructor(private readonly aggregareRehydrator: AggregateRehydrator) {}

  async execute(command: AcknowledgeAlarmCommand) {
    this.logger.debug(
      `Processing "AcknowledgeAlarmCommand": ${JSON.stringify(command)}`,
    );

    const alarm = await this.aggregareRehydrator.rehydrate(
      command.alarmId,
      Alarm,
    );

    alarm.acknowledge();
    alarm.commit();

    return alarm;
  }
}
