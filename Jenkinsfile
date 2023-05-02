pipeline {
	agent any
	stages {
		stage("verify tooling") {
			steps {
				sh '''
					docker version
					docker info
				'''
			}
		}
		stage('Tests') {
			steps {
				script {
				sh 'npm i'
				sh 'npm run test'
				}
			}
			post {
				always {
				step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/clover.xml', lineCoverageTargets: '100, 95, 50'])
				}
			}
		}
		stage("killing old container") {
			steps {
				sh 'sudo docker system prune --all'
			}
		}
		stage("build") {
			steps {
				sh 'docker build -t api-gateway-service .'
			}
		}
		stage("run") {
			steps {
				sh '''
                    docker run -d \
                    -e HOST=api_gateway_service \
                    -e JWT_SECRET=1kZDnw8==jh \
					-e PORT=8000 \
					-p 8000:8000 \
					--hostname api_gateway_service \
                    --network middleware-network \
					--restart always \
					--name api_gateway_service api_gateway_service
				'''
			}
		}
	}
}