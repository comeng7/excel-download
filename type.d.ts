declare type TExcelRow = {
  [key: string]: string | number;
};

declare class ExcelDownloader {
  constructor(data: TExcelRow[], header: string[]);
  download(filename: string): Promise<void>;
}

declare var XLSX: any;
