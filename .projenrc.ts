import { JsiiProject } from 'projen/lib/cdk';
const project = new JsiiProject({
  author: 'Robert Hanuschke',
  authorAddress: 'robhan-cdk-lib@hanuschke.eu',
  autoApproveOptions: {
    allowedUsernames: ['robert-hanuschke'],
    secret: 'GITHUB_TOKEN',
  },
  autoApproveUpgrades: true,
  defaultReleaseBranch: 'main',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
    },
  },
  jsiiVersion: '~5.8.0',
  license: 'MIT',
  name: 'utils',
  packageName: '@robhan-cdk-lib/utils',
  projenrcTs: true,
  publishToGo: {
    moduleName: 'github.com/robert-hanuschke/robhan-cdk-lib-utils',
  },
  publishToMaven: {
    javaPackage: 'io.github.roberthanuschke.cdk.utils',
    mavenGroupId: 'io.github.robert-hanuschke',
    mavenArtifactId: 'cdk-utils',
    mavenServerId: 'central-ossrh',
  },
  publishToNuget: {
    dotNetNamespace: 'Robhan.CdkLib',
    packageId: 'Robhan.CdkLib.Utils',
  },
  publishToPypi: {
    distName: 'robhan_cdk_lib.utils',
    module: 'robhan_cdk_lib.utils',
  },
  repositoryUrl: 'https://github.com/robert-hanuschke/cdk-utils',
});

const releaseWorkflow = project.github?.tryFindWorkflow('release');

releaseWorkflow?.file!.addOverride(
  'jobs.release_npm.env.NPM_ACCESS_LEVEL',
  'public',
);

project.synth();