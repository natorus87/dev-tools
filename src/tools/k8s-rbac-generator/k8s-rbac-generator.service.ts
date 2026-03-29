import { stringify } from 'yaml';

export type SubjectKind = 'User' | 'Group' | 'ServiceAccount';

export interface RbacSubject {
  kind: SubjectKind;
  name: string;
  namespace?: string;
}

export interface RbacRule {
  apiGroups: string[];
  resources: string[];
  verbs: string[];
}

export interface RbacConfig {
  name: string;
  scope: 'Namespace' | 'Cluster';
  namespace: string;
  subjects: RbacSubject[];
  rules: RbacRule[];
  labels: Record<string, string>;
}

export function generateRbacYaml(config: RbacConfig): string {
  const isCluster = config.scope === 'Cluster';
  const roleKind = isCluster ? 'ClusterRole' : 'Role';
  const bindingKind = isCluster ? 'ClusterRoleBinding' : 'RoleBinding';

  const roleMetadata: any = {
    name: config.name || 'unnamed-role',
  };
  if (!isCluster && config.namespace) {
    roleMetadata.namespace = config.namespace;
  }
  if (Object.keys(config.labels).length > 0) {
    roleMetadata.labels = config.labels;
  }

  const role: any = {
    apiVersion: 'rbac.authorization.k8s.io/v1',
    kind: roleKind,
    metadata: roleMetadata,
  };

  if (config.rules && config.rules.length > 0) {
    role.rules = config.rules.map((rule) => {
      const formattedRule: any = {};
      
      const apiGroups = rule.apiGroups.filter(x => x.trim() !== '');
      formattedRule.apiGroups = apiGroups.length > 0 ? apiGroups : [''];
      
      const resources = rule.resources.filter(x => x.trim() !== '');
      formattedRule.resources = resources.length > 0 ? resources : ['*'];
      
      const verbs = rule.verbs.filter(x => x.trim() !== '');
      formattedRule.verbs = verbs.length > 0 ? verbs : ['*'];
      
      return formattedRule;
    });
  } else {
    // If no rules, add an empty placeholder to make it valid YAML structure-wise but safe
    role.rules = [];
  }

  const bindingMetadata: any = {
    name: config.name ? `${config.name}-binding` : 'unnamed-binding',
  };
  if (!isCluster && config.namespace) {
    bindingMetadata.namespace = config.namespace;
  }
  if (Object.keys(config.labels).length > 0) {
    bindingMetadata.labels = config.labels;
  }

  const binding: any = {
    apiVersion: 'rbac.authorization.k8s.io/v1',
    kind: bindingKind,
    metadata: bindingMetadata,
    roleRef: {
      apiGroup: 'rbac.authorization.k8s.io',
      kind: roleKind,
      name: roleMetadata.name,
    },
    subjects: config.subjects.map((sub) => {
      const formattedSub: any = {
        kind: sub.kind,
        name: sub.name || 'unnamed-subject',
      };
      // User and Group must use the apiGroup rbac.authorization.k8s.io. ServiceAccount has none.
      if (sub.kind === 'User' || sub.kind === 'Group') {
        formattedSub.apiGroup = 'rbac.authorization.k8s.io';
      }
      if (sub.kind === 'ServiceAccount' && sub.namespace) {
        formattedSub.namespace = sub.namespace;
      } else if (sub.kind === 'ServiceAccount') {
        formattedSub.namespace = 'default';
      }
      return formattedSub;
    }),
  };

  if (binding.subjects.length === 0) {
      delete binding.subjects;
  }

  const roleYaml = stringify(role, { lineWidth: 0 });
  const bindingYaml = stringify(binding, { lineWidth: 0 });

  return `${roleYaml}\n---\n${bindingYaml}`;
}
