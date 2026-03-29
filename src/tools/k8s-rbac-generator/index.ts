import { ShieldCheck } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'K8s RBAC generator',
  path: '/k8s-rbac-generator',
  description: 'Generate Kubernetes role-based access control (RBAC) YAML manifests for roles and bindings.',
  keywords: ['k8s', 'kubernetes', 'rbac', 'role', 'binding', 'clusterrole', 'clusterrolebinding', 'security'],
  component: () => import('./k8s-rbac-generator.vue'),
  icon: ShieldCheck,
  createdAt: new Date('2026-03-26'),
});