<style scoped>
    div{
        position: relative;
        font-size: 14px;
    }
    span.copy{
        border-radius: 0 0 3px 3px;
        padding: 2px 5px;
        position: absolute;
        top: 5px;
        right: 0;
        color: #b2b2b2;
        cursor: pointer;
    }
    .bg + span.copy{
        right: 5px;
    }
    span.copy:hover{
        color: #5c6b77;
    }
</style>
<template>
    <div>
        <pre :class="{bg: bg}"><code :class="language" ref="code"><slot name="code"></slot></code></pre>
        <span class="copy" @click="clip">
            <Icon type="clipboard" size="18" v-show="!copied"></Icon>
            <Icon type="checkmark" size="18" v-show="copied" style="color:#5cb85c"></Icon>
        </span>
    </div>
</template>
<script>
    import hljs from 'hljs';
    import Clipboard from 'clipboard';

    export default {
        props: {
            lang: {
                type: String,
                default: 'javascript'
            },
            bg: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                code: '',
                copied: false,
                docLang: this.$lang
            }
        },
        computed: {
            language () {
                if (this.lang == 'auto') {
                    return ''
                } else {
                    return this.lang;
                }
            }
        },
        mounted () {
            this.code = this.$refs.code.innerHTML.replace(/\n/, '');
            this.$refs.code.innerHTML = this.code;
            hljs.highlightBlock(this.$refs.code);
        },
        methods: {
            clip () {
                const code = this.code.replace(/&lt;/g,'<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
                const clipboard = new Clipboard('.copy', {
                    text () {
                        return code
                    }
                });

                clipboard.on('success', (e) => {
                    e.clearSelection();
                    clipboard.destroy();
                    this.copied = true;
                    if (this.docLang === 'zh-CN') {
                        this.$Message.success('代码已复制到剪贴板');
                    } else {
                        this.$Message.success('Code copied');
                    }
                    setTimeout(() => {
                        this.copied = false;
                    }, 2000);
                });
            }
        }
    }
</script>
