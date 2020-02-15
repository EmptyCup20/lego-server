// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFile from '../../../app/model/file';
import ExportProject from '../../../app/model/project';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    File: ReturnType<typeof ExportFile>;
    Project: ReturnType<typeof ExportProject>;
    User: ReturnType<typeof ExportUser>;
  }
}
