import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export const questionGeneratorTemplate = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate(
    `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question to

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`
  ),
])


export const qaTemplate = ChatPromptTemplate.fromPromptMessages([
  HumanMessagePromptTemplate.fromTemplate(
    `Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

{context}

Question: {question}
please answer in Japanese.
Helpful Answer:`
  )])
