export class NotifyFacilitySupervisorCommand {
  constructor(
    public readonly facility: string,
    public readonly alarmIds: string[],
  ) {}
}
