import { NIcon } from 'naive-ui'

export default function (icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
