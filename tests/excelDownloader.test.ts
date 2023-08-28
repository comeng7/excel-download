import ExcelDownloader from '../src/ExcelDownloader';

describe('ExcelDownloader', () => {
  let excel: ExcelDownloader;

  beforeEach(() => {
    global.URL.createObjectURL = jest.fn();
    global.URL.revokeObjectURL = jest.fn();
    const mockData: TExcelRow[] = [{ name: 'JJO', age: 28 }];
    const mockHeader: string[] = ['name', 'age'];
    excel = new ExcelDownloader(mockData, mockHeader);
  });

  it('construct with data and headers', () => {
    expect(excel).toBeDefined();
  });
});
