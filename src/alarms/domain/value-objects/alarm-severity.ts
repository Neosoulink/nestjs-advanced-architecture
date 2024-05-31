export class AlarmSeverity {
  constructor(readonly value: 'critical' | 'hight' | 'medium' | 'low') {}

  equal(severity: AlarmSeverity) {
    return this.value === severity.value;
  }
}
