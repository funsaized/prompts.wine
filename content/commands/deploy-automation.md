---
title: "Automated Deployment Pipeline"
description: "Complete CI/CD deployment automation command workflow"
category: "commands"
tags: ["commands", "deployment", "automation", "cicd"]
author: "DevOps Team"
date: "2024-01-27"
---

# Automated Deployment Pipeline

A comprehensive deployment automation workflow that handles testing, building, and deployment across multiple environments.

## Command Overview

This command orchestrates a complete deployment pipeline with the following stages:
1. **Pre-deployment Validation**
2. **Automated Testing**
3. **Build and Package**
4. **Security Scanning**
5. **Deployment to Staging**
6. **Integration Testing**
7. **Production Deployment**
8. **Post-deployment Verification**

## Usage

```bash
# Deploy to staging
./deploy.sh --env staging --branch main --skip-tests false

# Deploy to production with approval gate
./deploy.sh --env production --branch release --approve required

# Rollback deployment
./deploy.sh --rollback --env production --version v1.2.3
```

## Command Structure

### Basic Deployment
```bash
#!/bin/bash
set -e

ENVIRONMENT=${1:-staging}
BRANCH=${2:-main}
SKIP_TESTS=${3:-false}

echo "🚀 Starting deployment to $ENVIRONMENT"
echo "📦 Branch: $BRANCH"
echo "🧪 Skip tests: $SKIP_TESTS"

# Pre-deployment checks
echo "🔍 Running pre-deployment validation..."
./scripts/validate-environment.sh $ENVIRONMENT

# Run tests unless skipped
if [ "$SKIP_TESTS" != "true" ]; then
  echo "🧪 Running test suite..."
  npm test
  npm run test:integration
fi

# Security scanning
echo "🛡️  Running security scans..."
npm audit --audit-level moderate
docker scan $IMAGE_NAME

# Build and deploy
echo "🏗️  Building application..."
npm run build:$ENVIRONMENT

echo "📋 Deploying to $ENVIRONMENT..."
kubectl apply -f k8s/$ENVIRONMENT/
kubectl rollout status deployment/app -n $ENVIRONMENT

# Post-deployment verification
echo "✅ Running post-deployment checks..."
./scripts/health-check.sh $ENVIRONMENT

echo "🎉 Deployment to $ENVIRONMENT completed successfully!"
```

## Advanced Features

### Environment-Specific Configuration
```yaml
# deploy-config.yml
environments:
  staging:
    replicas: 2
    resources:
      memory: "512Mi"
      cpu: "0.5"
    monitoring: basic
    
  production:
    replicas: 5
    resources:
      memory: "2Gi"  
      cpu: "1.0"
    monitoring: full
    approval_required: true
```

### Rollback Strategy
```bash
# Automated rollback on failure
deploy_and_verify() {
  local env=$1
  local version=$2
  
  # Deploy new version
  kubectl set image deployment/app app=$IMAGE:$version -n $env
  
  # Wait for rollout with timeout
  if ! kubectl rollout status deployment/app -n $env --timeout=300s; then
    echo "❌ Deployment failed, initiating rollback..."
    kubectl rollout undo deployment/app -n $env
    kubectl rollout status deployment/app -n $env
    exit 1
  fi
  
  # Health check
  if ! ./scripts/health-check.sh $env; then
    echo "❌ Health check failed, initiating rollback..."
    kubectl rollout undo deployment/app -n $env
    exit 1
  fi
  
  echo "✅ Deployment successful and verified"
}
```

## Monitoring and Notifications

### Slack Integration
```bash
send_notification() {
  local status=$1
  local env=$2
  local message=$3
  
  curl -X POST -H 'Content-type: application/json' \
    --data "{
      \"text\":\"🚀 Deployment $status\",
      \"attachments\":[{
        \"color\":\"$([ "$status" = "SUCCESS" ] && echo "good" || echo "danger")\",
        \"fields\":[{
          \"title\":\"Environment\",
          \"value\":\"$env\",
          \"short\":true
        },{
          \"title\":\"Status\",
          \"value\":\"$message\",
          \"short\":true
        }]
      }]
    }" \
    $SLACK_WEBHOOK_URL
}
```

## Error Handling

The command includes comprehensive error handling:
- **Test Failures**: Automatic deployment cancellation
- **Build Errors**: Immediate pipeline termination  
- **Deployment Failures**: Automatic rollback to previous version
- **Health Check Failures**: Rollback and team notification
- **Resource Limits**: Scaling recommendations and alerts

## Prerequisites

- Docker and Kubernetes CLI tools
- Node.js and npm for application builds
- Access to container registry
- Configured kubectl contexts for all environments
- Slack webhook URL for notifications (optional)

## Security Considerations

- **Secrets Management**: All sensitive data stored in Kubernetes secrets
- **Image Scanning**: Automated vulnerability scanning before deployment
- **RBAC**: Role-based access control for different environments
- **Audit Logging**: Complete audit trail of all deployment activities

## Customization

This deployment command can be customized for different technology stacks:
- **Languages**: Node.js, Python, Java, Go, etc.
- **Platforms**: Kubernetes, Docker Swarm, AWS ECS, etc.
- **Monitoring**: Prometheus, DataDog, New Relic, etc.
- **Notifications**: Slack, Teams, Email, PagerDuty, etc.