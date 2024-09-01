// extract-create-input-types.ts
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

// コマンドライン引数からテーブル名を取得
const tableName = process.argv[2];
if (!tableName) {
  console.error('テーブル名を指定してください。例: npm start -- Users');
  process.exit(1);
}

// Prismaの型定義ファイルを読み込み
const prismaTypesPath = path.resolve(__dirname, '../node_modules/.prisma/client/index.d.ts');
const prismaTypes = readFileSync(prismaTypesPath, 'utf-8');

// 指定されたテーブルの 'CreateInput'を含む型定義を抽出
const createInputRegex = new RegExp(`export type ${tableName}CreateInput\\s*=\\s*{[^}]*}`, 'gs');
const createInputTypes = prismaTypes.match(createInputRegex)
  ?.map(type => {
    // 'CreateInput' の文字列を削除するが、型名部分は残す
    const cleanedType = type.replace(/CreateInput/g, '').trim();
    return cleanedType;  // 型名は残しつつ、中の 'CreateInput' のみ削除
  })
  .join('\n\n') || '';

// 出力ディレクトリのパスを定義
const outputDir = path.resolve(__dirname, '../gen');

// 出力ディレクトリが存在しない場合は作成
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// 別ファイルに書き出し
const outputPath = path.join(outputDir, `${tableName}-ddl-types.d.ts`);
writeFileSync(outputPath, createInputTypes);

console.log(`gen/${tableName}-ddl-types.d.tsに出力しました。`);
