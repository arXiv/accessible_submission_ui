from flask import Flask, render_template
app = Flask(__name__)

page_titles = {
    'page1': 'start',
    'page2': 'contactInformation',
    'page3': 'termsConditions',
    'page4': 'licensing',
    'page5': 'addFiles',
    'page6': 'processing',
    'page7': 'pdfPreview',
    'page8': 'htmlPreview',
    'page9': 'metadata',
    'page10': 'category',
    'page11': 'review',
    'page12': 'finalizeSubmission',
}


@app.route('/start/')
def start():
    return render_template('page1.html', page_titles=page_titles, page_title=page_titles['page1'],prev_page=None,next_page=page_titles['page2'])

@app.route('/contactInformation/')
def contactInformation():
    return render_template('page2.html',page_titles=page_titles, page_title=page_titles['page2'],prev_page=page_titles['page1'],next_page=page_titles['page3'])

@app.route('/termsConditions/')
def termsConditions():
    return render_template('page3.html', page_titles=page_titles, page_title=page_titles['page3'],prev_page=page_titles['page2'],next_page=page_titles['page4'])

@app.route('/licensing/')
def licensing():
    return render_template('page4.html', page_titles=page_titles, page_title=page_titles['page4'],prev_page=page_titles['page3'],next_page=page_titles['page5'])

@app.route('/addFiles/')
def addFiles():
    return render_template('page5.html', page_titles=page_titles, page_title=page_titles['page5'],prev_page=page_titles['page4'],next_page=page_titles['page6'])

@app.route('/processing/')
def processing():
    return render_template('page6.html', page_titles=page_titles, page_title=page_titles['page6'],prev_page=page_titles['page5'],next_page=page_titles['page7'])

@app.route('/pdfPreview/')
def pdfPreview():
    return render_template('page7.html', page_titles=page_titles, page_title=page_titles['page7'],prev_page=page_titles['page6'],next_page=page_titles['page8'])

@app.route('/htmlPreview/')
def htmlPreview():
    return render_template('page8.html', page_titles=page_titles, page_title=page_titles['page8'],prev_page=page_titles['page7'],next_page=page_titles['page9'])

@app.route('/metadata/')
def metadata():
    return render_template('page9.html', page_titles=page_titles, page_title=page_titles['page9'],prev_page=page_titles['page8'],next_page=page_titles['page10'])


@app.route('/category/')
def category():
    return render_template('page10.html', page_titles=page_titles, page_title=page_titles['page10'],prev_page=page_titles['page9'],next_page=page_titles['page11'])

@app.route('/review/')
def review():
    return render_template('page11.html', page_titles=page_titles, page_title=page_titles['page11'],prev_page=page_titles['page10'],next_page=page_titles['page12'])

@app.route('/finalizeSubmission/')
def finalizeSubmission():
    return render_template('page12.html', page_titles=page_titles, page_title=page_titles['page12'],prev_page=page_titles['page11'],next_page=None)

if __name__ == '__main__':
    app.run(debug=True)
