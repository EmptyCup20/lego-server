// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFile from '../../../app/service/File';
import ExportGithub from '../../../app/service/Github';
import ExportProject from '../../../app/service/Project';
import ExportTest from '../../../app/service/Test';
import ExportUser from '../../../app/service/User';

declare module 'egg' {
  interface IService {
    file: ExportFile;
    github: ExportGithub;
    project: ExportProject;
    test: ExportTest;
    user: ExportUser;
  }
}
