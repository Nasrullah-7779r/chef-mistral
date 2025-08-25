pipeline {
  agent any
  options { timestamps(); ansiColor('xterm'); disableConcurrentBuilds() }

  environment {
    DIR_WEB   = '.'
    IMG_WEB   = 'chef-web-app'
    COMPOSE   = 'docker compose'  
  }

  triggers { githubPush() }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          env.GIT_SHORT = sh(returnStdout:true, script:'git rev-parse --short=7 HEAD').trim()
          env.BTAG = "b${env.BUILD_NUMBER}-g${env.GIT_SHORT}"
          echo "Immutable tag: ${env.BTAG}"
        }
      }
    }

    stage('Build image') {
      steps {
        sh """
          set -eux
          docker build -t ${IMG_WEB}:${BTAG} -t ${IMG_WEB}:latest ${DIR_WEB}
        """
      }
    }

    stage('Deploy') {
      steps {
        sh """
          set -eux

          cat > compose.deploy.yml <<YAML
          services:
            web: { image: ${IMG_WEB}:${BTAG} }
          YAML

          ${COMPOSE} -f docker-compose.yml -f compose.deploy.yml up -d web
        """
      }
    }
  }

  post {
    success {
      echo "Deployed chef-web ${env.BTAG}"
    }
  }
}
