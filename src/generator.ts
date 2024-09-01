// extract-create-input-types.ts
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

// Prismaの型定義ファイルを読み込み
const prismaTypesPath = path.resolve(__dirname, '../node_modules/.prisma/client/index.d.ts');
const prismaTypes = readFileSync(prismaTypesPath, 'utf-8');

// 'CreateInput'を含むが'UncheckedCreateInput'を含まないすべての型定義を抽出
const createInputTypes = prismaTypes.match(/export type (?!\w*Unchecked)\w+CreateInput\s*=\s*{[^}]*}/gs)?.join('\n\n') || '';

// 出力ディレクトリのパスを定義
const outputDir = path.resolve(__dirname, '../gen');

// 出力ディレクトリが存在しない場合は作成
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });  // フォルダを再帰的に作成
}

// 別ファイルに書き出し
const outputPath = path.join(outputDir, 'ddl-types.d.ts');
writeFileSync(outputPath, createInputTypes);

console.log('gen/ddl-types.d.tsに出力しました。');
