import { RequiredMark } from '../../form/Form';
import { computed, ComputedRef, inject, UnwrapRef } from 'vue';
import {
  ConfigProviderProps,
  defaultConfigProvider,
  Direction,
  SizeType,
} from '../../config-provider';

export default (
  name: string,
  props: Record<any, any>,
): {
  configProvider: UnwrapRef<ConfigProviderProps>;
  prefixCls: ComputedRef<string>;
  direction: ComputedRef<Direction>;
  size: ComputedRef<SizeType>;
  getTargetContainer: ComputedRef<() => HTMLElement>;
  space: ComputedRef<{ size: SizeType | number }>;
  pageHeader: ComputedRef<{ ghost: boolean }>;
  form?: ComputedRef<{
    requiredMark?: RequiredMark;
  }>;
} => {
  const configProvider = inject<UnwrapRef<ConfigProviderProps>>(
    'configProvider',
    defaultConfigProvider,
  );
  const prefixCls = computed(() => configProvider.getPrefixCls(name, props.prefixCls));
  const direction = computed(() => configProvider.direction);
  const space = computed(() => configProvider.space);
  const pageHeader = computed(() => configProvider.pageHeader);
  const form = computed(() => configProvider.form);
  const size = computed(() => props.size || configProvider.componentSize);
  const getTargetContainer = computed(() => props.getTargetContainer);
  return {
    configProvider,
    prefixCls,
    direction,
    size,
    getTargetContainer,
    space,
    pageHeader,
    form,
  };
};
