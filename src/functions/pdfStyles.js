
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

export const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'Oswald',
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 10,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 8,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    table1: {
        width: '100%',
        height: '40px',
        position: 'relative',
        border: '2px solid #486a23',
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
        
    },
    table2: {
        width: '100%',
        height: '40px',
        position: 'relative',
        border: '2px solid #486a23',
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
        
    },
    table3: {
        width: '100%',
        height: '80px',
        position: 'relative',
        border: '2px solid #486a23',
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
        
    },
    tableTitle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 5,
        fontSize: 8,
        backgroundColor: '#486a23',
        color: '#fff',
        borderTopLeftRadius: 5,
    },
    textInfo: {
        fontSize: 6,
        padding: 5,
    },
    textInfoFlex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },  
    textInfo1: {
        // display: 'inline',
        // textAlign: 'left',
        fontSize: 6,
        padding: 5,
    },
    textInfo2: {
        // display: 'inline',
        // textAlign: 'right',
        fontSize: 6,
        padding: 5,
    },
    infoFlex:{
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 30
    },
    infoBlock: {
        width: '100%',
    },
    spacing: {
        height: 20,
        display: 'block',   
    },
    table4: {
        width: '100%',
        height: '140px',
        borderBottom: '2px solid #dc143c',
        borderLeft: '2px solid #dc143c',
        borderRight: '2px solid #dc143c',
        position: 'relative',
        borderRadius: 5,
        marginBottom: 5,
        overflow: 'hidden',
    },
    tableTitleAlert: {
        fontSize: 10,
        display: 'block',
        backgroundColor: '#dc143c',
        width: '100%',
        textAlign: 'center',
        color: '#fff',
    },
    alertTable: {
        display: 'flex',
        flexDirection: 'row',
    },
    alertTableItem: {
        width: '50%',
        padding: 5,
        textAlign: 'justify',
    },
    alertTableText: {
        fontSize: 6,
        paddingLeft: 5,
    },
    alertTableTextRed: {
        marginTop: 5,
        fontSize: 6,
        paddingLeft: 5,
        color: '#dc143c',
    },
    titleAlert: {
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'Oswald',
        color: 'red',
    },
    finalText: {
        marginTop: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        marginBottom: 20,
    },
    footer: {
        display: 'flex',
        flexDirection: 'row',
    },
    footerItem: {
        marginTop: 20,
        width: '50%',
        textAlign: 'center',
    },
    footerText: {
        fontWeight: 15,
        fontSize: 10,
    }
});

