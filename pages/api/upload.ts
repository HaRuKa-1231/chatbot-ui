import { NextApiRequest, NextApiResponse } from 'next';
import { DocumentFile } from "@/types/documentFile";
import { IncomingForm, File } from "formidable";
import fs from 'fs';
import { join } from 'path';
import { docFromPdf } from '@/utils/server/createIndex';

// @ts-expect-error
import wasm from '../../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm?module';

const tempDir = join(process.cwd(), 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}


export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve(files);
    });
  });
  const { file } = data as { file: File };
  console.log(file)

  try {
    const tempFilePath = join(process.cwd(), 'temp', file.newFilename);
    fs.renameSync(file.filepath, tempFilePath);
    const index = await docFromPdf(tempFilePath, file.newFilename)
    fs.unlinkSync(tempFilePath);
    res.status(200).json({index, fileId: file.newFilename})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error" });
  }
};


export default handler;
