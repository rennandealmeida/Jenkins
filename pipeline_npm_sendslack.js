pipeline {
  agent any
  stages {
    stage('install package') {
      steps {
        nodejs('node') {
          sh 'npm install'
        }

      }
    }
    stage('run build') {
      steps {
        nodejs('node') {
          sh 'npm run build'
        }

      }
    }
    stage('deploy') {
      steps {
        sh '''cp -r $JENKINS_HOME/workspace/build_package $JENKINS_HOME/workspace/volume-montado/build_package_deploy \
             rm -rf $JENKINS_HOME/workspace/volume-montado/package_em_prod \
             mv $JENKINS_HOME/workspace/volume-montado/build_package_deploy $JENKINS_HOME/workspace/volume-montado/package_em_prod'''
      }
    }
  }
  post {
    success {
      slackSend(baseUrl: 'https://SeuWorkSpaceDoSlack.slack.com/services/hooks/jenkins-ci/', token: 'xxxxxxxxxxxxx', channel: 'CanalSlack', message: 'DEPLOY SUCCESS!')

    }

    failure {
      slackSend(baseUrl: 'https://SeuWorkSpaceDoSlack.slack.com/services/hooks/jenkins-ci/', token: 'xxxxxxxxxxxxx', channel: 'CanalSlack', message: 'DEPLOY FAILURE')

    }
}
}
