declare module 'excel-downloads' {
  export type TExcelRow = {
    [key: string]: string | number;
  };

  export class ExcelDownloader {
    constructor(data: TExcelRow[], header: string[]);
    download(filename: string): Promise<void>;
  }
}

declare var XLSX: any;
