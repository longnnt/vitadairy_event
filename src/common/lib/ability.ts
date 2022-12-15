import { AbilityBuilder, Ability, AbilityClass } from '@casl/ability';

interface Todo {
  type: 'Todo';
  id: number;
  title: string;
  assignee: string;
  completed: boolean;
}

type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
type Subjects = 'Todo' | Todo | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: number) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  if (role === 2) {
    can('manage', 'all');
  } else {
    can('read', 'all');
  }

  return rules;
}

export function buildAbilityFor(role: number): AppAbility {
  return new AppAbility(defineRulesFor(role), {
    detectSubjectType: (object) => object!.type,
  });
}
