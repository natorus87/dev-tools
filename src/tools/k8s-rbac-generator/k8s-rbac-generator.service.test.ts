import { expect, describe, it } from 'vitest';
import { generateRbacYaml } from './k8s-rbac-generator.service';

describe('k8s-rbac-generator', () => {
  it('should generate a valid Role and RoleBinding', () => {
    const yaml = generateRbacYaml({
      name: 'my-test-role',
      scope: 'Namespace',
      namespace: 'test-ns',
      labels: { app: 'test' },
      subjects: [{ kind: 'User', name: 'jane' }],
      rules: [{ apiGroups: [''], resources: ['pods'], verbs: ['get'] }]
    });

    expect(yaml).toContain('kind: Role');
    expect(yaml).toContain('kind: RoleBinding');
    expect(yaml).toContain('name: my-test-role');
    expect(yaml).toContain('namespace: test-ns');
    expect(yaml).toContain('apiGroups:\n  - ""');
    expect(yaml).toContain('name: jane');
  });

  it('should generate a valid ClusterRole and ClusterRoleBinding', () => {
    const yaml = generateRbacYaml({
      name: 'my-cluster-role',
      scope: 'Cluster',
      namespace: 'should-be-ignored',
      labels: {},
      subjects: [{ kind: 'ServiceAccount', name: 'my-sa', namespace: 'kube-system' }],
      rules: [{ apiGroups: ['apps'], resources: ['deployments'], verbs: ['*'] }]
    });

    expect(yaml).toContain('kind: ClusterRole');
    expect(yaml).toContain('kind: ClusterRoleBinding');
    expect(yaml).toContain('name: my-cluster-role');
    expect(yaml).not.toContain('namespace: should-be-ignored');
    expect(yaml).toContain('apiGroups:\n  - apps');
    expect(yaml).toContain('namespace: kube-system');
  });
});