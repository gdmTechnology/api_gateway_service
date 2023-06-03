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
		stage("install node_modules") {
			steps {
				script {
					sh 'npm i'
				}
			}
		}
		stage("remove old image") {
			steps {
				sh 'docker rmi api-gateway-service || true'
			}
		}
		stage("remove unused containers and images") {
			steps {
				sh 'docker system prune -af'
			}
		}
		stage("build typescript") {
			steps {
				sh 'npm run build'
			}
		}
		stage("build docker image") {
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
                    --network rem_network \
					--restart always \
					--name api_gateway_service api-gateway-service
				'''
			}
		}
	}
}