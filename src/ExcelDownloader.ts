export type TExcelRow = {
  [key: string]: string | number;
};

class ExcelDownloader {
  private data: TExcelRow[];
  private header: string[];

  constructor(data: TExcelRow[], header: string[]) {
    this.data = data;
    this.header = header;
  }

  async download(filename: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const workerBlob = new Blob([`self.addEventListener('message', ${this.workerFunction.toString()})`], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(workerBlob));

      worker.onmessage = (event) => {
        try {
          const buffer: ArrayBuffer = event.data;
          const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `${filename}.xlsx`;

          a.click();

          URL.revokeObjectURL(a.href);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          worker.terminate();
        }
      };

      worker.onerror = (error) => {
        worker.terminate();
        reject(error);
      };

      worker.postMessage({ data: this.data, header: this.header });
    });
  }

  private workerFunction(event: MessageEvent): void {
    importScripts('https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js');

    const data: TExcelRow[] = event.data.data;
    const header: string[] = event.data.header;

    const worksheetData: (string | number)[][] = [header];
    data.forEach((row) => {
      const rowData = header.map((key) => row[key]);
      worksheetData.push(rowData);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');

    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    self.postMessage(buffer);
  }
}

export default ExcelDownloader;
