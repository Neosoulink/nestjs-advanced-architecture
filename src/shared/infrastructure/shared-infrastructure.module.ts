import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './event-srore/schemas/event.schema';
import { EVENT_STORE_CONNECTION } from 'src/core/core.constants';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
})
export class SharedInfrastructureModule {}
