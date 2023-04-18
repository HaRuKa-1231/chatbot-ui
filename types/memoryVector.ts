export interface MemoryVector {
  content: string;
  embedding: number[];
  metadata: Record<string, any>;
}
