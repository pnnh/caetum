
import {useState} from "react";
import QRCode from 'qrcode'
import { css, html } from 'react-strict-dom';

const styles = css.create({
    qrCodeComponent: {
        marginBottom: '1rem'
    },
    description: {
        fontSize: '1rem',
        color: '#4a4a4a',
        margin: '1rem 0 1rem 0'
    },
    textContainer: {
        marginBottom: '1rem 0 1rem 0'
    },
    textareaStyle: {
        width: 'calc(100% - 2rem)',
        height: '100px',
        padding: '1rem',
        fontSize: '1rem',
        // border: '1px solid #ccc',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: '5px',
        // resize: 'none',
    },
    actionContainer: {
        marginBottom: '1rem 0 1rem 0'
    },
    buttonStyle: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        fontWeight: 600,
        //border: 'none',
        borderWidth: '0',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#127af8',
        color: '#fff',
    },
    errorContainerStyle: {
        padding: '0 1rem',
        color: 'red',
        fontSize: '1rem',
        fontStyle: 'italic',
    },
    resultContainerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgStyle: {
        width: '40%',
        aspectRatio: '1/1',
    }
});

export function QRCodeComponent({lang}: { lang: string }) {
    const [text, setText] = useState('')
    const [downloadUrl, setDownloadUrl] = useState('')
    const [error, setError] = useState('')
    return <html.div style={styles.qrCodeComponent}>
        <html.div style={styles.textContainer}>
                <html.textarea style={styles.textareaStyle} value={text}
                          onChange={(event: any) => setText(event.target.value)}
                          maxLength={1024}
                          placeholder={'请输入文本内容'}></html.textarea>
        </html.div>
        <html.div style={styles.actionContainer}>
            <html.button style={styles.buttonStyle} onClick={() => {
                if (!text) {
                    setError('qrcode.emptyText')
                    return
                }
                try {
                    setError('')
                    textToQRCode(text).then(downloadUrl => {
                        setDownloadUrl(downloadUrl)
                    })
                } catch (e) {
                    setError(`${'qrcode.errorTip'}${e}`)
                }
            }}>
                {'点击生成'}
            </html.button>
        </html.div>
        <html.div style={styles.errorContainerStyle}>
            {error && <html.div>{error}</html.div>}
        </html.div>
        <html.div style={styles.resultContainerStyle}>
            {
                downloadUrl && <html.img style={styles.imgStyle} alt={'preview'} src={downloadUrl}/>
            }
        </html.div>
    </html.div>
}

export async function textToQRCode(text: string) {
    return await QRCode.toDataURL(text, {
        width: 640,
        margin: 1
    })
}
