import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { EventSchema } from './event-store/schemas/event.schema';
import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { EventSerializer } from './event-store/serializers/event.serializer';
import { EventStorePublisher } from './event-store/publishers/event-store.publisher';
import { MongoEventStore } from './event-store/mongo-event-store';
import { EventsBridge } from './event-store/events-bridge';
import { EventDeserializer } from './event-store/deserializers/event.deserializer';
import { EventStore } from '../application/ports/event-store';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [
    EventSerializer,
    EventStorePublisher,
    MongoEventStore,
    EventDeserializer,
    EventsBridge,
    { provide: EventStore, useExisting: MongoEventStore },
  ],
  exports: [EventStore],
})
export class SharedInfrastructureModule {}
