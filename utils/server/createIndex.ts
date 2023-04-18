import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { MemoryVector } from "@/types/memoryVector";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// Import the legacy build of PDF.js
import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/legacy/build/pdf.worker.js";


export const docFromPdf = async (filePath: string, originalName: string) => {
  const loader = new PDFLoader(filePath)
  const docs = await loader.load()
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  })
  const newDocs = []
  for (const doc of docs) {
    doc.metadata.originalName = originalName;
    if(doc.pageContent.length > 1000) {
      const output = await splitter.splitDocuments([doc])
      newDocs.push(...output)
    } else {
      newDocs.push(doc)
    }
  }
  const vectorStore = await MemoryVectorStore.fromDocuments(
    newDocs, new OpenAIEmbeddings()
  )

  return vectorStore.memoryVectors
}

export const retrieverFromMemoryVectors = (memoryVectors: MemoryVector[]) => {
  const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings())
  vectorStore.memoryVectors = memoryVectors

  const vectorSizes = vectorStore.memoryVectors.map((vector) => vector.content.length)
  let sizes = 0
  let k = 4
  for (let i=0, l = vectorSizes.length; i < l; i++) {
    if (i > 3) break;
    const sortedVectorSizes = vectorSizes.sort()
    sizes += sortedVectorSizes[i]
    if (sizes > 2000) {
      k = i + 1;
      break;
    }
  }
  return vectorStore.asRetriever(k)
}
