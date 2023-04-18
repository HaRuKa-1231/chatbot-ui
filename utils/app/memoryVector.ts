import { MemoryVector } from '@/types/memoryVector'

export const getMemoryVector = (): MemoryVector[] | null => {
  const memoryVectors = localStorage.getItem('vectorstore');
  return memoryVectors ? JSON.parse(memoryVectors) : null;
}

export const overMaxMemoryVectorSize = (memoryVectors: MemoryVector[]) => {
  const json = JSON.stringify(memoryVectors);
  const size = json.length * 2;
  // localstorageが5MBを超えるとエラーになるので、4MBを超えたらtrueを返す
  return size > (4 * 1024 * 1024)
}
