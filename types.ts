export interface SlideProps {
  isActive: boolean;
  direction: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill: string;
}

export enum OracleType {
  CONSTANT = 'Constant',
  BALANCED = 'Balanced'
}

export interface DeutschJozsaState {
  selectedOracle: OracleType | null;
  result: string | null;
  isRunning: boolean;
}