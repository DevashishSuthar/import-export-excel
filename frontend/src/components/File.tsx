import React, { Fragment, useRef, useState } from 'react';
import { Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';

// Local absolute imports
import { VITE_BASE_URL } from '@/configs/Env';
import { FILE_EXTENSIONS } from '@/constants/FileExtensions';
import { IMG_LOGO } from '@/helpers/ImagesHelper';
import { showErrorToastMessage, showSuccessToastMessage } from '@/utils/ToastUtils';
import { generateExcelFromJson, generateJsonFromExcel } from '@/services/FileService';

// Alias the global File type to avoid shadowing by the component name
type UploadedFile = globalThis.File;

const FileConverter = () => {
    const jsonFileRef = useRef<HTMLInputElement>(null);
    const excelFileRef = useRef<HTMLInputElement>(null);
    const [selectedJsonFile, setSelectedJsonFile] = useState<UploadedFile | null>(null);
    const [selectedExcelFile, setSelectedExcelFile] = useState<UploadedFile | null>(null);
    const [generatedFileType, setGeneratedFileType] = useState('csv');

    const openUrlInNewTab = (url: string): void => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    const handleJsonFileUpload = async (): Promise<void> => {
        try {
            if (selectedJsonFile) {
                const formData = new FormData();
                formData.append('file', selectedJsonFile);
                formData.append('generatedFileType', generatedFileType);
                const response = await generateExcelFromJson(formData);
                const { success, message, data } = response.data;
                if (success && data) {
                    showSuccessToastMessage(message);
                    openUrlInNewTab(`${VITE_BASE_URL}/${data.excelFilePath}`);
                } else {
                    showErrorToastMessage(message);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('ERROR IN JSON UPLOAD: ', error.message);
            } else {
                console.log('ERROR IN JSON UPLOAD: ', error);
            }
        }
    };

    const handleExcelFileUpload = async (): Promise<void> => {
        try {
            if (selectedExcelFile) {
                const formData = new FormData();
                formData.append('excel', selectedExcelFile);
                const response = await generateJsonFromExcel(formData);
                const { success, message, data } = response.data;
                if (success && data) {
                    showSuccessToastMessage(message);
                    openUrlInNewTab(`${VITE_BASE_URL}/${data.jsonFilePath}`);
                } else {
                    showErrorToastMessage(message);
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('ERROR IN EXCEL UPLOAD: ', error.message);
            } else {
                console.log('ERROR IN EXCEL UPLOAD: ', error);
            }
        }
    };

    const onReaderLoad = (event: ProgressEvent<FileReader>, pendingFile: UploadedFile): void => {
        try {
            if (!event.target?.result) return;
            const result = event.target.result;
            if (typeof result === 'string') {
                JSON.parse(result);
                setSelectedJsonFile(pendingFile);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log('ERROR IN JSON PARSING: ', error.message);
            } else {
                console.log('ERROR IN JSON PARSING: ', error);
            }
            if (jsonFileRef.current) {
                jsonFileRef.current.value = '';
            }
            setSelectedJsonFile(null);
            showErrorToastMessage('Please upload json file in proper format.');
        }
    };

    const handleJsonFileChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const file = evt.target.files?.[0];
        if (file) {
            const { name } = file;
            const fileNameArr = name.split('.');
            const fileExt = fileNameArr[fileNameArr.length - 1].toLowerCase();
            if (fileExt !== FILE_EXTENSIONS.JSON) {
                showErrorToastMessage('Please upload .json file.');
                if (jsonFileRef.current) {
                    jsonFileRef.current.value = '';
                }
                setSelectedJsonFile(null);
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => onReaderLoad(event, file);
            reader.readAsText(file);
        }
    };

    const handleExcelFileChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const file = evt.target.files?.[0];
        if (file) {
            const { name } = file;
            const fileNameArr = name.split('.');
            const fileExt = fileNameArr[fileNameArr.length - 1].toLowerCase();
            if (fileExt === FILE_EXTENSIONS.XLS || fileExt === FILE_EXTENSIONS.XLSX) {
                setSelectedExcelFile(file);
            } else {
                showErrorToastMessage('Please upload .xls or .xlsx file.');
                if (excelFileRef.current) {
                    excelFileRef.current.value = '';
                }
                setSelectedExcelFile(null);
            }
        }
    };

    const handleRadioChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        setGeneratedFileType(evt.target.value);
    };

    return (
        <Fragment>
            <div className="logo-container">
                <img src={IMG_LOGO} alt="logo" />
            </div>
            <div className="parent-container">
                <div className="child-container">
                    <h3>JSON TO EXCEL CONVERTER</h3>
                    <p>Here you can first upload the json file, then select the file types between csv and xlsx and then in response you will get the Excel file from the selected file types.</p>
                    <p><span className="warning-note">Note:- </span>
                        Please upload the json file in the appropriate format by adding things like double quotation marks instead of single quotation marks or removing things like a comma, semicolon, etc.
                        The accepted file extension is .json.
                    </p>
                    <div>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Generated File Types</FormLabel>
                            <RadioGroup row aria-label="file-types" defaultValue="csv" onChange={handleRadioChange} name="row-radio-buttons-group">
                                <FormControlLabel value="csv" control={<Radio />} label="CSV" />
                                <FormControlLabel value="xlsx" control={<Radio />} label="XLSX" />
                            </RadioGroup>
                        </FormControl>
                        <br />
                        <Button variant="contained" color="primary" className="file-upload-btn">
                            Upload Your File
                            <input type="file" ref={jsonFileRef} onChange={handleJsonFileChange} className="custom-file-input" />
                        </Button>
                        <Button variant="outlined" disabled={!selectedJsonFile} onClick={handleJsonFileUpload}>Start Uploading Json File</Button>
                    </div>
                </div>
                <div className="child-container">
                    <h3>EXCEL TO JSON CONVERTER</h3>
                    <p>Here you can first upload the Excel file, then in response you will get the json file.</p>
                    <p><span className="warning-note">Note:- </span>
                        Please upload the Excel file in the appropriate format by adding keys in the header or first row and values in the respective key columns.
                        The accepted file extensions are xls and xlsx formats.
                    </p>
                    <Button variant="contained" color="primary" className="file-upload-btn">
                        Upload Your File
                        <input type="file" ref={excelFileRef} onChange={handleExcelFileChange} className="custom-file-input" />
                    </Button>
                    <Button variant="outlined" disabled={!selectedExcelFile} onClick={handleExcelFileUpload}>Start Uploading Excel File</Button>
                </div>
            </div>
        </Fragment>
    );
};

export default FileConverter;